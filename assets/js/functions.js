
(function($){
    /* trigger when page is ready */    
    $(document).ready(function() {

// Initialise View
        $('#cp2020_checkbox').attr('disabled', true);
        $('#charPoints').hide();
        $('#charPoints').prev().hide();
        $('#cinematic').hide();
        $('#pup').val(0);
        $('#cp').val(40);
        $('#pup').prev().hide();
        $('#pup').hide();
        $('#cp').prev().hide();
        $('#cp').hide();
        $('#availPickupSkills').prev().hide();
        $('#availPickupSkills').hide();
        $('#addSkill').hide();
    
    

// Global Variables    
        var characterPoints = 0;
        var carry = 0;
        var maxSkilLen = 22;
        var maxCareerPoints = 40;
        var stats = ['#int', '#ref', '#tech', '#cool', '#attr', '#luck', '#ma', '#body', '#emp'];
        var derived = ['#run', '#leap', '#lift'];
        var bookCodes = ['nt', 'hotb', 'pr'];
        var skills = ['Personal Grooming', 'Wardrobe & Style', 'Endurance', 'Strength Feat', 'Swimming', 'Interrogation', 
                     'Intimidate', 'Oratory', 'Resist Torture/Drugs', 'Streetwise', 'Human Perception', 'Interview', 
                     'Leadership', 'Seduction', 'Social', 'Persuasion & Fast Talk', 'Perform', 'Accounting', 'Anthropology', 
                     'Awareness/Notice', 'Biology', 'Botany', 'Chemistry', 'Composition', 'Diagnose Illness', 
                     'Education & Gen. Know', 'Expert', 'Gamble', 'Geology', 'Hide/Evade', 'History', 'Know Language', 
                     'Library Search', 'Mathmatics', 'Physics', 'Programming', 'Shadow/Track', 'Stock Market', 
                     'System Knowledge', 'Teaching', 'Wilderness Survival', 'Zoology', 'Archery', 'Athletics', 'Brawling',
                     'Dance', 'Dodge & Escape', 'Driving', 'Fencing', 'Handgun', 'Heavy Weapons', 'Martial Art', 'Melee', 
                     'Motorcycle', 'Operate Hvy. Machinery', 'Pilot(Gyro)', 'Pilot(Fixed Wing)', 'Pilot(Dirigible)', 
                     'Pilot(Vect. Thrust)', 'Rifle', 'Stealth', 'Submachinegun', 'Aero Tech', 'AV Tech', 'Basic Tech', 
                     'Cryotank Operation', 'Cyberdeck Design', 'CyberTech', 'Demolitions', 'Disguise', 'Electronics', 
                     'Elect. Security', 'First Aid', 'Forgery', 'Gyro Tech', 'Paint or Draw', 'Photo & Film', 
                     'Pharmaceuticals', 'Pick Lock', 'Pick Pocket', 'Play Instrament', 'Weaponsmith'];
        var cp_roles = ['Solo', 'Rockerboy', 'Netrunner', 'Media', 'Nomad', 'Fixer', 'Cop', 'Corp', 'Techie', 'Medtechie'];
        var cp_skills = [
            ['Solo', 
            'Combat Sense', 
            'Awareness/Notice', 'Handgun', 'Brawling/Martial Arts', 'Melee', 'Weapons Tech', 'Rifle', 'Athletics', 'Submachinegun', 'Stealth'],
            ['Rockerboy', 
            'Charis. Leadership', 
            'Awareness/Notice', 'Perform', 'Wardrobe & Style', 'Composition', 'Brawling', 'Play Instrument', 'Streetwise', 'Persuation', 'Seduction'],
            ['Netrunner', 
            'Interface', 
            'Awareness/Notice', 'Basic Tech', 'Education & Gen. Know', 'System Knowledge', 'CyberTech', 'Cyberdeck Design', 'Composition', 'Electronics', 'Programming'],
            ['Media', 
            'Credibility', 
            'Awareness/Notice', 'Composition', 'Education & Gen. Know', 'Persuation', 'Human Perception', 'Social', 'Streetwise', 'Photo & Film', 'Interview'],
            ['Nomad', 
            'Family', 
            'Awareness/Notice', 'Endurance', 'Melee', 'Rifle', 'Driving', 'Basic Tech', 'Wilderness Survival', 'Brawling', 'Athletics'],
            ['Fixer', 
            'Streetdael', 
            'Awareness/Notice', 'Forgery', 'Handgun', 'Brawling', 'Melee', 'Pick Lock', 'Pick Pocket', 'Intimidate', 'Persuation'],
            ['Cop', 
            'Authority', 
            'Awareness/Notice', 'Handgun', 'Human Perception', 'Athletics', 'Education & Gen. Know', 'Brawling', 'Melee', 'Interrogation', 'Streetwise'],
            ['Corp', 
            'Resources', 
            'Awareness/Notice', 'Human Perception', 'Education & Gen. Know', 'Library Search', 'Social', 'Persuation', 'Stock Market', 'Wardrobe & Style', 'Personal Grooming'],
            ['Techie', 
            'Jury Rig', 
            'Awareness/Notice', 'Basic Tech', 'CyberTech', 'Teaching', 'Education & Gen. Know', 'Electronics', 'Not impilimented yet', 'Not impilimented yet', 'Not impilimented yet'],
            ['Medtechie', 
            'Medical Tech', 
            'Awareness/Notice', 'Basic Tech', 'Diagnose Illness', 'Education & Gen. Know', 'Cryotank Operation', 'Library Search', 'Pharmaceuticals', 'Zoology', 'Human Perception']
        ];
        var nt_roles = [];
        var nt_skills = [];
        var nt_pickup_skills = [];
        var hotb_roles = [];
        var hotb_skills = [];
        var hotb_pickup_skills = [];
        var pr_roles = [];
        var pr_skills = [];
        var pr_pickup_skills = [];
        var availRoles = cp_roles.slice();
        var availRoleSkills = cp_skills.slice();
        var availSkills = skills.slice();
        var availPickupSkills = availSkills.slice();
        var pickupLines = [];
        var btm = 0;
        
// Custom Functions        
        function d(die, sides, bonus){ //simulates dice rolls
            var value = 0;
            var roll = 0;
            for(var i = 0; i < die; i++){
                roll = Math.ceil(Math.random()*sides);
                value += roll;
            }
            return value + bonus;
        }; //end d(die, sides, bonus)

        function defaultStart(points){
            $('#charPoints').val(points -= 18);
            $('#int, #ref, #tech, #cool, #attr, #luck, #ma, #body, #emp').val(2);
        }; //end defaultStat(points)    
        
        function calcDerived(){
            var $ref = $('#ref'),
                $run = $('#run'),
                $body = $('#body'),
                $leap = $('#leap');
            $('#modref').val($ref.val());
            $('#modemp').val($('#emp').val());
            $run.val(parseInt($('#ma').val()) * 3);
            var run = parseInt($run.val());
            if(run > 0){
                $leap.val(parseFloat($run.val()) / 4);
            } else {
                $leap.val("0");
            }
            carry = parseInt($body.val()) * 10;
            $('#lift').val(parseInt($body.val()) * 40);
            $('#pup').val(parseInt($ref.val()) + parseInt($('#int').val()))
            
            switch (parseInt($('#body').val())){
                case 0:
                case 1:
                case 2:
                    btm = -0;
                    break;
                case 3:
                case 4:
                    btm = -1;
                    break;
                case 5:
                case 6:
                case 7:
                    btm = -2;
                    break;
                case 8:
                case 9:
                    btm = -3;
                    break;
                case 10:
                    btm = -4;
                    break;
                default:
                    btm = -5;
            }
        }; //end calcDerived()
        
        function reset(){
            characterPoints = 0;
            carry = 0;
            btm = 0;
            availRoles = cp_roles;
            availSkills = [];
            $('#pup').val(0);
            $('#cp').val(maxCareerPoints);
            for(var i = 0; i < bookCodes.length; i++){
                $('#' + bookCodes[i] + '_checkbox').attr('checked', false);
            }
            $('#int, #ref, #tech, #cool, #attr, #luck, #ma, #body, #emp').val(0);
            $('#charPoints').val(0);
            $('#charPoints').hide();
            $('#charPoints').prev().hide();
            $('#cinematic').hide();
            $('#pup').prev().hide();
            $('#pup').hide();
            $('#cp').prev().hide();
            $('#cp').hide();
            $('#availPickupSkills').prev().hide();
            $('#availPickupSkills').hide();
            $('#addSkill').hide();
            $('#careerSkills').empty();
            $('#pickupSkills').empty();
            $('#skills #availPickupSkills').empty();
            availRoles = cp_roles.slice();
            availRoleSkills = cp_skills.slice();
            availSkills = skills.slice();
            availPickupSkills = availSkills.slice();
            pickupLines = [];
            $('#roles').empty();
            $('#character-sheet').empty();
            populateRole();
            calcDerived();
            $('#generate').show();
            $('.tabs li:first a').click();
            $('#logo').click();
        }; // end reset()
        
        function populateRole(){
            var $roles = $('#roles');
            $roles.empty();
            $roles.append('<option value="Choose a role">Choose a role</option>');
            for(var i = 0; i < availRoles.length; i++){
                $roles.append('<option value="' + availRoles[i] + '">' + availRoles[i] + '</option>');
            }
        }; // end populateRole()
        
        function populateAvailPickups(){
            // Populate availPickupSkills dropdown box
            $('#skills #availPickupSkills').empty().append('<option value="Choose a skill">Choose a Skill</option>');
            for(var i = 0; i < availPickupSkills.length; i++){
                $('#skills #availPickupSkills').append('<option value="' + availPickupSkills[i] + '">' + availPickupSkills[i] + '</option>');
            } 
        };
        

// Single Page Website Controls        
        $('#fullpage').fullpage({
            //navigation
            anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
            sectionsColor: ['#333333', '#000000', '#000000', '#000000'],
            //scrolling
            css3: true,
            //call-backs
            onLeave: function(index, nextIndex, direction){
                var leavingSection = $(this);

                //after leaving section
                $('nav li.selected').removeClass('selected');
            },            
            afterLoad: function(anchorLink, index){
                var loadedSection = $(this);
            
                //using index
                if(index == 2){
                    $('#bs').addClass('selected');
                }
                if(index == 3){
                    $('#gen').addClass('selected');
                }
                if(index == 4){
                    $('#pv').addClass('selected');
                }
            }
        }); // end fullpage()

// Slider Controls
        $('.slider').anyslider({
            interval: 0,
            showBullets: false
        });// end anyslider()

// Tab controls (McFarland, 2011)
        $('.tabs a').click(function(){
            $this=$(this);
            $('.panel').hide();
            $('.tabs a.active').removeClass('active');
            $this.addClass('active').blur();
            var panel = $this.attr('href');
            $(panel).fadeIn(250);
            return false;
        }); // end click()

        $('.tabs li:first a').click();

// Header Menu-bar controls
        $('#logo').click(function(){
            $.fn.fullpage.moveTo(1);
        }); // end click()

        $('#bs').click(function(){
            $.fn.fullpage.moveTo(2);
        }); // end click()

        $('#gen').click(function(){
            $.fn.fullpage.moveTo(3);
        }); // end click()

        $('#pv').click(function(){
            $.fn.fullpage.moveTo(4);
        }); // end click()

        $('.scroll-down').click(function(){
            $.fn.fullpage.moveSectionDown();
        }); // end click()

// Character Generator Controls
        populateRole();
        
        $('#generate').click(function(){
            var cpMethod = 0,
                $charpoints = $('#charPoints');
            while(cpMethod < 1 || cpMethod > 3 || isNaN(cpMethod)){
                cpMethod = parseInt(prompt ("What character point method are you using (1)Random (2)Fast (3)Cinematic?", "1"));
            }
            if (cpMethod == 1){
                while(characterPoints < 18){
                    characterPoints = d(9, 10, 0);
                }
                $charpoints.prev().show();
                $charpoints.show();
                defaultStart(characterPoints);
                calcDerived();
            } else if (cpMethod == 2){
                var roll = 0;
                for(var i = 0; i < 9; i++){
                    roll = 0;
                    while(roll < 2){
                        roll = d(1, 10, 0);
                    }
                    $(stats[i]).val(roll);
                }
                calcDerived();
            } else if (cpMethod == 3){
                $('#cinematic').show();
            }
            $('.clickable').addClass('trigger');
            $(this).hide();
        }); // end click()

        $('#cinematic').change(function(){
            characterPoints = parseInt($('#cinematic :selected').val());
            if(characterPoints != 0){
                $('#charpoints').prev().show();
                $('#charpoints').show();
                defaultStart(characterPoints);
                calcDerived();   
            }
        }); // end change()

        $('#roles').change(function(){
            var selectedRole = $('#roles :selected').val();
            var roleSkills = [];
            var skillLine;
            $('#skills .skills').empty();
            if (selectedRole != "Choose a role"){
                // Find Career Skills for Role
                for(var i = 0; i < availRoleSkills.length; i++){
                    if (availRoleSkills[i][0] == selectedRole){
                        roleSkills = availRoleSkills[i].slice();
                        break;
                    }
                }
                // Populate Career Skills
                for(var i = 1; i < roleSkills.length; i++){
                    var skill = roleSkills[i];
                    var skillSection = $('.skills');
                    skillLine = '<label for="' + skill + '" class="skillLine">' + skill + ' ';
                    for(var j = 0; j < (maxSkilLen - skill.length); j++){
                        skillLine += '.';
                    }
                    skillLine += '</label><input class="clickable trigger careerSkill" type="text" name="' + skill + '" id="#' + skill + '" value="0" size="2" readonly data-tooltip="#careerSkill" /><br />';
                    $('#skills #careerSkills').append(skillLine);
                }
                $('#skills #careerSkills').append('<label> </label>');
                $('#skills #careerSkills').append('<label> </label>');
                // Create up to date skills list
                for(var i = 2; i < roleSkills.length; i++){
                    for(var j = 0; j < availSkills.length; j++){
                        if(roleSkills[i] == availPickupSkills[j]){
                            availPickupSkills.splice(j, 1);
                            break;
                        }
                    }
                }
                populateAvailPickups();
                
                $('#cp').prev().show();
                $('#cp').show();
                $('#pup').prev().show();
                $('#pup').show(); 
                $('#availPickupSkills').prev().show();
                $('#availPickupSkills').show();
                $('#addSkill').show();                
            }
        }); // end change()
        
        $('#skills #addSkill').click(function(){
            var skill = $('#skills #availPickupSkills :selected').val();
            var $pickupSkills = $('#skills #pickupSkills');
            if (skill != "Choose a skill"){
                var skillLine;
                $('#pup').val((parseInt($('#int').val()) + parseInt($('#ref').val())));
                skillLine = '<label for="' + skill + '" class="skillLine">' + skill + ' ';
                for(var j = 0; j < (maxSkilLen - skill.length); j++){
                    skillLine += '.';
                }
                skillLine += '</label><input class="clickable trigger pickupSkill" type="text" name="' + skill + '" id="#' + skill + '" value="0" size="2" readonly data-tooltip="#pickupSkill" /><br />';
                pickupLines.push(skillLine);
                var fillNo = 3 - (pickupLines.length % 3);
                if (pickupLines.length % 3 == 0){
                    fillNo = 0;
                }
                $pickupSkills.empty();
                for(var i = 0; i < pickupLines.length; i++){
                    $pickupSkills.append(pickupLines[i]);
                }
                for(var i = 0; i != fillNo; i++){
                    $pickupSkills.append('<label> </label>');
                }
                for(var j = 0; j < availPickupSkills.length; j++){
                    if(skill == availPickupSkills[j]){
                        availPickupSkills.splice(j, 1);
                        populateAvailPickups();
                            break;
                    }
                }
                
            }
        }); // end click()
        
        $('#lpgenerate').click(function(){ //there is a better way of doing this look into it
            var clothes = ['Biker leathers', 'Blue jeans', 'Corperate Suits', 'Jumpsuits', 'Miniskirts', 'High Fasion', 'Cammos', 'Normal clothes', 'Nude', 'Bag Lady chic'];
            var hair = ['Mohawk', 'Long & Ratty', 'Short & Spiked', 'Wild & all over', 'Bald', 'Striped', 'Tinted', 'Neat, short', 'Short, curly', 'Long, straight'];
            var affectations = ['Tatoos', 'Mirrorshades', 'Ritual Scars', 'Spiked gloves', 'Nose Rings', 'Earrings', 'Long fingernails', 'Spike heeled boots', 'Weird Contact Lenses', 'Fingerless gloves'];
            var ethnicity = [
                ['Anglo-American', 'English'], 
                ['African', 'Bantu', 'Fante', 'Kongo', 'Ashanti', 'Zulu', 'Swahili'],
                ['Japanese/Korean', 'Japanese/Korean'],
                ['Central European/Soviet', 'Bulgarian', 'Russian', 'Czech', 'Polish', 'Ukranian', 'Slovak'],
                ['Pacific Islander', 'Microneasian', 'Tagalog', 'Polynesian', 'Malayan', 'Sudanese', 'Indonesian', 'Hawaiian'],
                
            ];
            var insert;
            var roll;
            roll = d(1, 10, 0);
            $('#clothes').append(clothes[roll - 1]);
            roll = d(1, 10, 0);
            $('#hair').append(hair[roll - 1]);
            roll = d(1, 10, 0);
            $('#affectations').append(affectations[roll - 1]);
            roll = d(1, 10, 0);
            //$('#ethnicity').append(ethnicity[roll - 1][1]);
            //$('#language').append(ethnicity[roll - 1][i]);
        }); // end click()
        
        $('#int, #ref, #tech, #cool, #attr, #luck, #ma, #body, #emp').click(function(){
            var $this = $(this),
                $charPoints = $('#charPoints'),
                newCharPoints = parseInt($charPoints.val()),
                newPoints = parseInt($this.val());
            if(newCharPoints != 0 && newPoints != 10){
                $this.val(newPoints + 1);
                $charPoints.val(newCharPoints - 1);
            }
            calcDerived();
            return false;
        }); // end click()
        
        $('#charPoints').click(function(){
            defaultStart(characterPoints);
            calcDerived();
        }); // end click()
        
        $('#generator').on('click', '.reset', function(){
            reset();
        }); // end on()
        
        $('#careerSkills').on('click', '.careerSkill', function(){
            var $careerSkill = $(this);
            var $cp = $('#cp');
            if ((parseInt($careerSkill.val()) < 10) && (parseInt($cp.val()) > 0)){
                $careerSkill.val(parseInt($careerSkill.val()) + 1);
                $cp.val(parseInt($cp.val()) - 1);
            }
        }); // end on()
        
        $('#cp').click(function(){
            $(this).val(40);
            $('.careerSkill').val(0);           
        }); // end click()
        
        $('#pickupSkills').on('click', '.pickupSkill', function(){
            var $pickupSkill = $(this);
            var $pup = $('#pup');
            if ((parseInt($pickupSkill.val()) < 10) && (parseInt($pup.val()) > 0)){
                $pickupSkill.val(parseInt($pickupSkill.val()) + 1);
                $pup.val(parseInt($pup.val()) - 1);
            }
        }); // end on()
        
        $('#pup').click(function(){
            $(this).val(parseInt($('#int').val()) + parseInt($('#ref').val()));
            $('.pickupSkill').val(0);           
        }); // end click()
        
        $('#print').click(function(){
            var $charactersheet = $('#character-sheet');
            var temp;
            var allstats = stats.concat(derived);
            $charactersheet.empty();
            $charactersheet.append('<p>');
            $charactersheet.append('<form class="printable-section">');
            temp = $('#handle').val();
            $charactersheet.append('<img src="assets/img/drawingandtitle.jpg" alt="A place for a drawing." class="textwrapright" />');
            $charactersheet.append('<label>HANDLE: ' + temp + '   </label>');
            $charactersheet.append('</form>');
            temp = $('#roles :selected').val();
            $charactersheet.append('<label>ROLE: ' + temp + '   </label>');
            if (characterPoints != 0){
                $charactersheet.append('<br /><label>CHARACTER POINTS: ' + characterPoints + '   </label>');
            }
            $charactersheet.append('</form>');
            $charactersheet.append('</p>');
            $charactersheet.append('<p>');
            $charactersheet.append('<form class="printable-section">');
            $charactersheet.append('<img src="assets/img/stats.jpg" alt="STATS heading" /><br />');
            for(var i = 0; i < allstats.length; i++){
                var modtemp;
                var modtempval;
                var labeltemp;
                var idtemp = allstats[i];
                labeltemp = (idtemp.substr(1)).charAt(0).toUpperCase() + (idtemp.substr(1)).slice(1);
                temp = $(idtemp).val();
                if(idtemp == '#ref' || idtemp == '#emp'){
                    modtemp = '#mod' + (idtemp.substr(1))
                    modtempval = $(modtemp).val();
                    $charactersheet.append('<label>' + labeltemp + ': [' + temp + '/' + modtempval + '] </label>');
                } else {
                    $charactersheet.append('<label>' + labeltemp + ': [' + temp + '] </label>');
                }
                if ((i + 1) % 4 == 0){
                    $charactersheet.append('<br />');
                }
            }
            $charactersheet.append('</form>');
            $charactersheet.append('</p>');
            $charactersheet.append('<p>');
            $charactersheet.append('<img src="assets/img/armour.jpg" alt="Armour Boxes" /><br />');
            $charactersheet.append('<img src="assets/img/damage.jpg" alt="Damage Boxes" class="textwrapleft" />');
            $charactersheet.append('<label>BTM: ' + btm + '</label><br /><br />');
            temp = $('#body').val();
            $charactersheet.append('<label>Save: ' + temp + '</label><br /><br /><br />');
            $charactersheet.append('</p>');
            $charactersheet.append('<p>');
            $charactersheet.append('<img src="assets/img/skills.jpg" alt="SKILLS heading" /><br />');
            
            $charactersheet.append('</p>');
            $.fn.fullpage.moveTo(4);
           // $charactersheet.append('<form class="printable"><input type="button" class="reset trigger" value="Reset" data-tooltip="#reset" /></form>');
        });

// Tool-Tip Controls (McFarland, 2011)
    
        $('body').on('mouseover', '.trigger',function(){
            var ttLeft,
                ttTop,
                $this=$(this),
                $tip = $($this.attr('data-tooltip')),
                triggerPos = $this.offset(),
                triggerH = $this.outerHeight(),
                triggerW = $this.outerWidth(),
                tipW = $tip.outerWidth(),
                tipH = $tip.outerHeight(),
                screenW = $(window).width(),
                scrollTop = $(document).scrollTop();
            if(triggerPos.top - tipH - scrollTop > 0){
                ttTop = triggerPos.top - tipH -10;
            } else {
                ttTop = triggerPos.top + triggerH + 10;
            }
            var overFlowRight = (triggerPos.left + tipW) - screenW;
            if(overFlowRight > 0){
                ttLeft = triggerPos.left - overFlowRight - 10;
            } else {
                ttLeft = triggerPos.left;
            }
            $tip.css({
                left : ttLeft ,
                top : ttTop,
                position: 'absolute'
            }).fadeIn(0);
        }); // end on()
    
        $('body').on('mouseout', '.trigger', function(){
            $('.tooltip').fadeOut(0);
        }); // end on()
    
    }); // end ready()


/* optional triggers
    $(window).load(function() {

    });
    
    $(window).resize(function() {
    
    });
    */

})(window.jQuery);