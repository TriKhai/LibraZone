x      
<template>
  <div class="card edition__about col-8">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">Detail</Tab>
        <Tab value="2">Review</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p class="m-0">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore nihil laboriosam
            esse fugit, illum quasi tenetur hic nobis sit ducimus facilis dolor architecto porro,
            possimus omnis error quidem illo repellendus voluptate recusandae. Pariatur sed facilis
            totam hic dolor atque maxime quibusdam deserunt, minima velit, eum veniam dolore
            mollitia provident corporis et ullam quia unde sit cum excepturi eligendi error
            incidunt! Enim quod dicta laudantium eos, corporis commodi iure minima neque ullam sed
            voluptates animi aperiam non reiciendis laboriosam ducimus numquam vel eaque doloribus
            velit culpa. Possimus similique delectus iste nesciunt animi beatae eius perspiciatis
            sint, quasi quam incidunt cum labore cumque, facilis ab est eos magni reiciendis
            voluptatem provident ipsum nulla reprehenderit? Odit enim maxime numquam nam, voluptatem
            tempora unde quisquam ipsum sunt! Omnis, harum ratione! Culpa quae ipsam magni similique
            ipsa soluta pariatur error quia praesentium temporibus illum quo voluptatum modi ratione
            beatae, incidunt facere excepturi aut nemo. Voluptatem laudantium molestiae voluptatum.
            Eius dicta quo labore sequi sunt? Doloribus suscipit praesentium pariatur quo saepe
            ipsam nostrum, sed vel quis consequatur voluptate at cupiditate dolorum distinctio ullam
            laboriosam earum cumque voluptas ut dolore labore alias fugit. Repellendus ullam id ipsa
            alias consectetur vel eum voluptas aperiam animi, quia fugit excepturi nostrum labore
            tempore, mollitia blanditiis vitae harum, eos inventore deserunt? Illo quaerat
            architecto at, ratione aliquam quam sequi, ab officiis nihil numquam distinctio quas,
            molestias itaque saepe. Quae vitae provident perspiciatis at aperiam. Veritatis quidem
            eius totam ducimus voluptates eligendi architecto enim autem, quo, doloremque tempora
            velit numquam impedit reprehenderit repellat rem incidunt odit magnam temporibus
            expedita inventore facere quia. Ea nisi commodi, eligendi quis amet porro cumque
            quisquam, quasi harum quae ipsam nemo facilis, odio omnis optio totam eum debitis
            cupiditate nulla earum perferendis in placeat. Eum odio, neque dignissimos culpa
            consequuntur incidunt repudiandae ad explicabo provident iure porro. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatem quam
            vitae, assumenda itaque unde. Earum, architecto ad iusto nulla ab veritatis dolores
            animi incidunt exercitationem mollitia quo consequatur facilis sed, autem recusandae
            assumenda est, voluptas ex aut. Laborum cumque blanditiis voluptatum quisquam fugit
            illum ex, porro dolor quod maiores, adipisci, repellat officia. Ab, placeat veniam
            veritatis, tempore et corrupti corporis impedit id quia, molestias autem hic eveniet
            nisi fugiat repellat minus. Nemo nesciunt odio omnis eligendi facere. Eius laboriosam
            enim sit qui minus ratione magni nostrum, perferendis quae, illo iure quam dolorem iusto
            accusamus at accusantium fugit itaque consequuntur commodi a voluptas ab aliquid modi
            quia. Tempora laboriosam quod corrupti debitis quis molestias ratione maiores
            dignissimos ab modi eum in ex sequi odit amet similique, a eos expedita dolorum enim
            voluptatum aspernatur harum. Facere suscipit nemo ipsa eius? Facere nam cupiditate sint
            fugit repellat. Accusantium ea consequuntur, perspiciatis totam ipsum voluptatibus
            eligendi, est earum dicta vero, quibusdam incidunt aperiam eum amet tenetur laboriosam
            molestiae in itaque voluptatem praesentium ipsam mollitia! Voluptatum sit totam earum
            molestiae similique? Culpa, voluptatibus deleniti itaque ratione minus illo? Placeat
            doloremque error veniam iusto aliquam ea quibusdam vero distinctio nesciunt assumenda,
            dolorum rem, labore aliquid.
          </p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
            nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
</script>

<style scoped>
.edition__about {
  border: 2px solid #ccc;
  border-radius: 8px;
  /* width: 80%; */
  padding: 20px;
  transition: all 1s;
}

.edition__about:hover {
  border-color: #000;
}
</style>